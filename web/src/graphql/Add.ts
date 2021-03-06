/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Add
// ====================================================

export interface Add {
  /**
   * Adds a plant by using a name, and any other value for the available fields, returning the newly created plant ID
   */
  add: string | null
}

export interface AddVariables {
  name: string
  other_names?: string | null
  description?: string | null
  plant_season?: string | null
  harvest_season?: string | null
  prune_season?: string | null
  tips?: string | null
}
