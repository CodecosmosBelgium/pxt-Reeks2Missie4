### @hideIteration true
### @flyoutOnly true
# Mission 4

```blocks
player.onChat("extra", function () {
    for (let i = 0; i < 5; i++) {
        if (CodeCosmos.detectBlock_Extra()) {
            CodeCosmos.dropBlock_Extra()
            CodeCosmos.moveBlock(FourDirection.Forward)
            CodeCosmos.moveBlock_WithOne(FourDirection.Forward)
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