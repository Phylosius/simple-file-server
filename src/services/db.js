import sql from './sql.js';

const fileColumns = ['id', 'name', 'mimetype', 'size', 'path']


export async function getAllFile() {
    const result = await sql`
        SELECT ${sql(fileColumns)} FROM file
    `;

    return result;
} 

export async function getByID(fileID) {
    const result = await sql`
        SELECT ${sql(fileColumns)} FROM file
        WHERE id = '${fileID}'
    `;

    return result;
}

export async function save(file) {
    await sql`
        INSERT INTO file ${
            sql(file, fileColumns)
        }
    `
};
