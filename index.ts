
import fetch from 'node-fetch';

type Context = {
    req: any;
    res: any;
    log: (message: string) => void;
    error: (message: string) => void;
};


export default async ({ req, res, log, error }: Context) => {
    try {
        const response = await fetch(process.env.API_BASE_URL + '/api/departures/sync', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.ENTUR_SYNC_SECRET}` 
            }
        });
        
        const data = await response.json();
        log(`Cron triggered successfully: ${JSON.stringify(data)}`);
        return res.send('Success');
    } catch (err) {
        error(`Cron failed: ${err instanceof Error ? err.message : String(err)}`);
        return res.send('Failed', 500);
    }
};