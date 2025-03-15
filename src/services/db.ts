import sql from './sql';

interface FileInfo {
    id?: string,
    name: string,
    mimetype: string,
    size: number,
    path: string,
    created_at?: Date,
    updated_at?: Date
}

const fileColumns: any[] = ['id', 'name', 'mimetype', 'size', 'path']


export async function getAllFile(): Promise<[FileInfo]> {
    const result = await sql<[FileInfo]>`
        SELECT ${sql(fileColumns)} FROM file
    `;

    return result;
} 

export async function getByID(fileID: string): Promise<[FileInfo]> {
    const result = await sql<[FileInfo]>`
        SELECT ${sql(fileColumns)} FROM file
        WHERE id = ${fileID}
    `;

    return result;
}

export async function save(file: FileInfo) {
    await sql`
        INSERT INTO file ${
            sql(file, fileColumns)
        }
    `
};
