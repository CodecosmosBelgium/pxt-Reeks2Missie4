### @hideIteration true
### @flyoutOnly true
# Mission 4

```blocks
player.onChat("level2", function () {
    for (let i = 0; i < 5; i++) {
        if (CodeCosmos.detectBlock()) {
            CodeCosmos.dropBlock_Level2()
            CodeCosmos.moveBlock(FourDirection.Forward)
        }
    }
}
```

```template
player.onChat("level2", function () {
    
})
```

## Sorting plastic
Use the learning platform to solve the exercise.