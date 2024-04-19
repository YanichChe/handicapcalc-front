export function readableJson(data: unknown) {
    return JSON.stringify(data, null, '\t')
}