//% color=190 weight=100 block="CodeCosmos" icon="\uf71e"
namespace CodeCosmos {
    //% block="nieuwe blok" weight=100 
    export function dropBlock() {
        const block = randint(0, 1) ? DIAMOND_BLOCK : GOLD_BLOCK;
        blocks.place(block, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="agent verplaats blok naar links" color="#D83B01" weight=100
    export function moveBlockToLeft() {
        agent.teleport(world(2558, 69, 27), WEST)
        for (let i = 0; i < 10; i++) {
            blocks.clone(
                world(2557 - i, 69, 27),
                world(2557 - i, 69, 27),
                world(2557 - i - 1, 69, 27),
                CloneMask.Replace,
                CloneMode.Normal
            )
            blocks.place(AIR, world(2557 - i, 69, 27))
            agent.move(FORWARD, 1)
            loops.pause(300)
        }
    }

    //% block="agent verplaats blok naar rechts" color="#D83B01" weight=100
    export function moveBlockToRight() {
        agent.teleport(world(2556, 69, 27), EAST)
        for (let i = 0; i < 10; i++) {
            blocks.clone(
                world(2557 + i, 69, 27),
                world(2557 + i, 69, 27),
                world(2557 + i + 1, 69, 27),
                CloneMask.Replace,
                CloneMode.Normal
            )
            blocks.place(AIR, world(2557 + i, 69, 27))
            agent.move(FORWARD, 1)
            loops.pause(300)
        }
    }   
}