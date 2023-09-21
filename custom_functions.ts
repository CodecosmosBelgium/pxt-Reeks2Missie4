//% color=190 weight=100 block="CodeCosmos"
namespace CodeCosmos {
    //% block="nieuwe blok" weight=100 
    export function dropBlock() {
        randomBlock = randint(0, 1) ? Plastic.blue : Plastic.pink;
        blocks.place(randomBlock === Plastic.pink ? DIAMOND_BLOCK : GOLD_BLOCK, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="nieuwe blok level 2" weight=100 
    export function dropBlockLevel2() {
        let block
        switch (randint(0, 3)) {
            case 0: randomBlock = Plastic.blue; block = GOLD_BLOCK; break;
            case 1: randomBlock = Plastic.pink; block = DIAMOND_BLOCK; break;
            case 2: randomBlock = Plastic.green; IRON_BLOCK; break;
            case 3: randomBlock = Plastic.yellow; REDSTONE_BLOCK; break;
        }
        blocks.place(randomBlock, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="agent verplaats blok $direction" color="#D83B01" weight=100
    export function moveBlock(direction: FourDirection) {
        switch(direction) {
            case FourDirection.Forward: agent.teleport(world(2558, 69, 27), WEST); break;
            case FourDirection.Back: agent.teleport(world(2556, 69, 27), EAST); break;
            case FourDirection.Left: agent.teleport(world(2557, 69, 28), NORTH); break;
            case FourDirection.Forward: agent.teleport(world(2557, 69, 26), SOUTH); break;
        }
        

        for (let i = 0; i < 12; i++) {
            let clonePosition
            let destionation
            switch (direction) {
                case FourDirection.Forward: clonePosition = world(2557 - i, 69, 27); destionation = world(2557 - i - 1, 69, 27); break;
                case FourDirection.Back: clonePosition = world(2557 + i, 69, 27); destionation = world(2557 + i + 1, 69, 27); break;
                case FourDirection.Left: clonePosition = world(2557, 69, 27 - i); destionation = world(2557, 69, 27 - i - 1); break;
                case FourDirection.Forward: clonePosition = world(2557, 69, 27 + i); destionation = world(2557, 69, 27 + i + 1); break;
            }
            blocks.clone(
                clonePosition,
                clonePosition,
                destionation,
                CloneMask.Replace,
                CloneMode.Normal
            )
            blocks.place(AIR, clonePosition)
            agent.move(FORWARD, 1)
            loops.pause(250)
        }

        switch(direction) {
            case FourDirection.Forward: if (randomBlock === Plastic.green) player.execute("/scoreboard players add @a correctBlocks 1"); break;
            case FourDirection.Left: if (randomBlock === Plastic.blue) player.execute("/scoreboard players add @a correctBlocks 1"); break;
            case FourDirection.Right: if (randomBlock === Plastic.pink) player.execute("/scoreboard players add @a correctBlocks 1"); break;
            case FourDirection.Back: if (randomBlock === Plastic.yellow) player.execute("/scoreboard players add @a correctBlocks 1"); break;
        }
    }

    //% block="detecteer $block"
    export function detectBlock(block: Plastic = Plastic.blue) {
        return randomBlock === block;
    }

}

enum Plastic {
    //% block="blauwe plastic"
    blue,
    //% block="roze plastic"
    pink,
    //% block="groene plastic"
    green,
    //% block="gele plastic"
    yellow,
}