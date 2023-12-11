### @hideIteration true
### @flyoutOnly true
# Mission 4

```blocks
player.onChat("extra", function () {
    for (let i = 0; i < 5; i++) {
        if (CodeCosmos.detectBlock()) {
            CodeCosmos.dropBlock_extraLevel()
            CodeCosmos.moveBlock(FourDirection.Forward)
        }
    }
}
```

```template
player.onChat("extra", function () {
    
})
```

## Sorting plastic
Use the learning platform to solve the exercise.