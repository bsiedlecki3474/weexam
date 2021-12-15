export interface CRUD {
    list: (params: any) => Promise<{
        data: any,
        recordsTotal: number,
        recordsFiltered: number,
        draw: number
    }>;
    detail: (id: number) => Promise<{ data: {} }>
    create: (body: any) => Promise<{ data: number }>;
    update: (body: any) => Promise<{ data: number }>;
    del: (id: number) => Promise<{ data: number }>;
}

