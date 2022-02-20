import * as process from "process";
import { credentials, Metadata } from "@grpc/grpc-js";
import * as api from "@opentelemetry/api";
import { SpanAttributes, SpanStatus, SpanStatusCode } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { DnsInstrumentation } from "@opentelemetry/instrumentation-dns";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { configuration } from "./configuration";

const createTracer = (honeycombAPIKey: string): api.Tracer => {
  const traceExporter = createTraceExporter(honeycombAPIKey);
  const tracerProvider = createTracerProvider(traceExporter);

  tracerProvider.register();

  registerInstrumentations({
    tracerProvider,
    instrumentations: [
      new DnsInstrumentation(),
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });

  process.on("SIGINT", async () => {
    console.log("Flushing telemetry...");
    await tracerProvider.activeSpanProcessor.forceFlush();
    console.log("Flushed");
    process.exit();
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
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: configuration.serviceName,
    }),
  });
  provider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
  provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));
  return provider;
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
