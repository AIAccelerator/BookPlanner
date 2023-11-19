import type { ScrapeUrl } from '@wasp/jobs/scrapeUrl';

type ScrapeUrlArgs = {
    url: string;
};

export const performScrape: ScrapeUrl<never, void> = async (args: ScrapeUrlArgs, context) => {
    console.log('Starting CRON JOB: \n\nScraping url...');
    console.log('Scraping url: ', args.url);    

    
};