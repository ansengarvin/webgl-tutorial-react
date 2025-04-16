export interface ProgramInfo {
    program: WebGLProgram,
    attribLocations: {
        vertexPosition: GLint
    },
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation | null,
        modelViewMatrix: WebGLUniformLocation | null
    }
}