import ResourceType from "./ResourceType";

export type FormData = {
    url?: string;
    title: string;
    description?: string;
    tags?: string[];
    file?: { name: string; path: string;}
    resourceType: ResourceType;
    userId: number;
  };
  