export class Repositorio {
    id: number;
    name: string;
    private: boolean;
    html_url: string;
    description: string;
    laguages_url: Record<string, number>;
    created_at: Date;
    pushed_at: Date;
    language: string;
    topics: string[];
    deployments_url: string
    
}