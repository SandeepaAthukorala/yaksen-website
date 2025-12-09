declare module 'delaunator' {
    export default class Delaunator {
        static from(points: ArrayLike<ArrayLike<number>>): Delaunator;
        triangles: Uint32Array;
        halfedges: Int32Array;
        hull: Uint32Array;
        coords: ArrayLike<number>;
    }
}
