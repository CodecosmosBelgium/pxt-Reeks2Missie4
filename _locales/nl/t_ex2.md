### @hideIteration true
### @flyoutOnly true
# Missie 4

```blocks
player.onChat("level2", function () {
    for (let i = 0; i < 5; i++) {
        if (CodeCosmos_NL.detectBlock()) {
            CodeCosmos_NL.dropBlock_Level2()
            CodeCosmos_NL.moveBlock(FourDirection.Forward)
        }
    }
}
```

```template
player.onChat("level2", function () {
    
})
```

## Sorteer plastic
Gebruik het leerplatform om de oefening op te lossen.