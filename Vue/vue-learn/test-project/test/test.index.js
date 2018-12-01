import Vue from 'vue'
import MyComponent from './src/components/HelloWorld.vue'

describe("My components", () => {
  it("has a created hook", () => {
    expect(typeof MyComponent.created).toBe("function")
  })
})
