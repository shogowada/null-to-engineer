import * as process from "process";
import { credentials, Metadata } from "@grpc/grpc-js";
import * as api from "@opentelemetry/api";
import { SpanAttributes, SpanStatusCode } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { DnsInstrumentation } from "@opentelemetry/instrumentation-dns";
import { configuration } from "./configuration";

const createTracer = (honeycombAPIKey: string): api.Tracer => {
  const traceExporter = createTraceExporter(honeycombAPIKey);
  const tracerProvider = createTracerProvider(traceExporter);

  process.on("SIGINT", async () => {
    console.log("Flushing telemetry...");
    tracerProvider.activeSpanProcessor
      .forceFlush()
      .then(() => console.log("Flushed telemetry"))
      .catch((error) => console.log("Failed to flush telemetry", error))
      .finally(() => process.exit());
  });

  tracerProvider.register();

  registerInstrumentations({
    tracerProvider,
    instrumentations: [
      new HttpInstrumentation(),
      new DnsInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });

  return api.trace.getTracer(configuration.serviceName);
};

const createTraceExporter = (honeycombAPIKey: string): OTLPTraceExporter => {
  const metadata = new Metadata();
  metadata.set("x-honeycomb-team", honeycombAPIKey);
  metadata.set("x-honeycomb-dataset", configuration.honeycombDataset);

  return new OTLPTraceExporter({
    url: "grpc://api.honeycomb.io:443/",
    credentials: credentials.createSsl(),
    metadata,
  });
};

const createTracerProvider = (traceExporter: OTLPTraceExporter) => {
  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: configuration.serviceName,
  });

  const tracerProvider = new NodeTracerProvider({
    resource,
  });

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
  // tracerProvider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));

  return tracerProvider;
};

let tracer: api.Tracer | undefined;
const getTracer = (): api.Tracer | undefined => {
  if (configuration.honeycombAPIKey && !tracer) {
    console.log("Initializing tracer...");
    tracer = createTracer(configuration.honeycombAPIKey);
    console.log("Initialized tracer");
    return tracer;
  } else {
    return tracer;
  }
};

export const initializeTracer = () => {
  getTracer();
};

export const trace = <T>(
  name: string,
  attributes: SpanAttributes,
  action: () => PromiseLike<T>
): PromiseLike<T> => {
  const tracer = getTracer();
  if (tracer) {
    return tracer.startActiveSpan(name, { attributes }, async (span) => {
      try {
        const result: T = await action();
        return result;
      } catch (error) {
        span.recordException(error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error?.message ?? "Unexpected error",
        });
        throw error;
      } finally {
        span.end();
      }
    });
  } else {
    return action();
  }
};
