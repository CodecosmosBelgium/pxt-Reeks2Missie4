### @hideIteration true
### @flyoutOnly true
# Missie 4

```blocks
player.onChat("extra", function () {
    for (let i = 0; i < 5; i++) {
        if (CodeCosmos_NL.detectBlock_Extra()) {
            CodeCosmos_NL.dropBlock_Extra()
            CodeCosmos_NL.moveBlock(FourDirection.Forward)
            CodeCosmos_NL.moveBlock_WithOne(FourDirection.Forward)
        }
    }
}
```

```template
player.onChat("extra", function () {
    
})
```

## Sorteer plastic
Gebruik het leerplatform om de oefening op te lossen.