import { Chunk } from ".";
import { Block, BlockType } from "../blocks";
import { BlockPosition } from "../blocks/Block.position";
import { ChunkCoords } from "./coords";

export class ChunkRouter {
  private chunks: Map<string, Chunk> = new Map<string, Chunk>;
  readonly CHUNK_SIZE: number = 16;

  *iter(): Iterable<Chunk> {
    for (const [_, chunk] of this.chunks) {
      yield chunk;
    }
  }

  create(coords: ChunkCoords): Chunk {
    const key = coords.serialize();
    
    const mappedChunk = this.chunks.get(key);
    if (mappedChunk !== undefined) throw new Error(`A chunk at ${key} already exists!`);

    const newChunk = new Chunk(coords);
    
    this.chunks.set(key, newChunk);

    return newChunk;
  }

  chunkAt(coords: ChunkCoords): Chunk | undefined {
    const key = coords.serialize();

    return this.chunks.get(key);
  }

  blockAt(type: BlockType, position: BlockPosition): Block | undefined {
    const positionInChunk = position.toPositionInChunk();

    const key = positionInChunk.chunkCoords.serialize();
    const chunk = this.chunks.get(key);
    if (chunk === undefined) return;

    return chunk.at(type, positionInChunk);
  }

  put(block: Block): this {
    const coords = block.position.toChunkCoords();

    const key = coords.serialize();
    const chunk = this.chunks.get(key) ?? new Chunk(coords);

    chunk.put(block);

    this.chunks.set(key, chunk);

    return this;
  }

  remove(type: BlockType, position: BlockPosition): boolean {
    const positionInChunk = position.toPositionInChunk();
    const coords = positionInChunk.chunkCoords;

    const key = coords.serialize();
    const chunk = this.chunks.get(key);
    if (chunk === undefined) return false;

    return chunk.remove(type, positionInChunk);
  }
}