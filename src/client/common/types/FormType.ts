import ResourceType from "./ResourceType";

export type FormData = {
    url?: string;
    title: string;
    description?: string;
    tags?: string[];
    resourceType: ResourceType;
    userId: number;
  };
  