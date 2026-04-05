
import { registerGroup } from './group.js'
import { registerRank } from './rank.js'

export function register() {
    registerGroup();
    registerRank();
}

export * from './characterTitle.js'
export * from './group.js'
export * from './translate.js'
export * from './character.js'
export * from './card.js'
export * from './skill.js'
export * from './rank.js'