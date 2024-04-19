export type ProjectConfig = {
    serviceConfig: ServiceConfig
}

export type ServiceConfig = {
    serviceAuthUrl: string
}
export const projectConfig: ProjectConfig = {
    serviceConfig: {
        serviceAuthUrl: 'http://localhost:8080/api/v0/handicap/course',
    },
}