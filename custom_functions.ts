//% color=190 weight=100 block="CodeCosmos"
namespace CodeCosmos {
    //% block="nieuwe blok" weight=100 
    export function dropBlock() {
        randomBlock = randint(0, 1) ? Plastic.blue : Plastic.red;
        blocks.place(randomBlock === Plastic.red ? DIAMOND_BLOCK : GOLD_BLOCK, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="nieuwe blok 2" weight=100 
    export function dropBlockLevel2() {
        switch (randint(0, 3)) {
            case 0: randomBlock = Plastic.blue; break;
            case 1: randomBlock = Plastic.red; break;
            case 2: randomBlock = Plastic.green; break;
            case 3: randomBlock = Plastic.orange; break;
        }
        blocks.place(randomBlock, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="agent verplaats blok $direction" color="#D83B01" weight=100
    export function moveBlock(direction: FourDirection) {
        let compassDirection
        switch(direction) {
            case FourDirection.Forward: compassDirection = WEST; break;
            case FourDirection.Back: compassDirection = EAST; break;
            case FourDirection.Left: compassDirection = NORTH; break;
            case FourDirection.Forward: compassDirection = SOUTH; break;
        }
        agent.teleport(world(2558, 69, 27), compassDirection);

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
    }

    //% block="detecteer $block"
    export function detectBlock(block: Plastic = Plastic.blue) {
        return randomBlock === block;
    }

}

enum Plastic {
    //% block="blauwe plastic"
    blue,
    //% block="rode plastic"
    red,
    //% block="groene plastic"
    green,
    //% block="oranje plastic"
    orange,
}