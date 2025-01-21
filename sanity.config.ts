"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  apiVersion,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Preserve existing actions
    actions: (prev) => prev,
    // Add production URL handling
    productionUrl: async (prev, context) => {
      const remoteUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
      
      try {
        // Trigger revalidation
        await fetch(`${remoteUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _type: context.document._type,
            _id: context.document._id,
          }),
        });
      } catch (err) {
        console.error('Failed to revalidate:', err);
      }
      
      return prev;
    },
  },
  studio: {
    components: {
      // You can add custom studio components here if needed
    },
  },
});
