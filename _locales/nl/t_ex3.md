### @hideIteration true
### @flyoutOnly true
# Missie 4

```blocks
player.onChat("level3", function () {
    for (let i = 0; i < 5; i++) {
        if (CodeCosmos_NL.detectBlock()) {
            CodeCosmos_NL.dropBlock_Level3()
            CodeCosmos_NL.moveBlock(FourDirection.Forward)
        }
    }
}
```

```template
player.onChat("level3", function () {
    
})
```

## Sorteer plastic
Gebruik het leerplatform om de oefening op te lossen.