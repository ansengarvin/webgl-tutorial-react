export interface ProgramInfo {
    program: WebGLProgram,
    attribLocations: {
        vertexPosition: GLint,
        vertexColor: GLint
    },
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation | null,
        modelViewMatrix: WebGLUniformLocation | null
    }
}