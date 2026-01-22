
# Two-Step Plan: Safe Restore Point, Then Remove Blue Empty

## Step 1: Create a Restore Point (Tiny Change First)
Add a simple comment at the top of `MovingAnimation.tsx` - something harmless like:
```typescript
// RESTORE POINT - v1.0 - Working animation with 4 scenes
```

This gives you a clean save point you can revert to if anything goes wrong in Step 2.

## Step 2: Remove the Blue Empty Room Image Only

**What stays EXACTLY the same:**
- The entire CssTruck component (lines 10-206) - untouched
- The truck animation logic (drive-right, drive-left phases) - untouched
- The crossfade effect - untouched
- Everything about how the truck moves - untouched

**What changes (minimal edits):**
1. **Line 6**: Remove the `newHouseEmpty` import
2. **Line 8**: Change Scene type from `"original" | "empty" | "newHouse" | "blueEmpty"` to `"original" | "empty" | "newHouse"`
3. **Lines 212-217**: Remove `blueEmpty` from the backgrounds object
4. **Lines 219-302**: Update the animation sequence to loop through 3 scenes instead of 4:
   - `original` (tan room with boxes) → truck drives → 
   - `empty` (tan room without boxes) → truck drives → 
   - `newHouse` (blue room with boxes) → truck drives → repeat

**New simpler sequence:**
```
original → (truck right) → empty → (truck left) → newHouse → (truck right) → original → repeat
```

## Summary
- Step 1: Add comment = restore point
- Step 2: Remove 1 import, 1 type value, 1 background entry, simplify the animation loop
- Truck: 100% untouched
