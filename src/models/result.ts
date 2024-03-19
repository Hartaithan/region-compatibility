export interface Attributes {
  facets: unknown
  next: unknown[]
}

export interface GameContentTypeList {
  name: string
  key: string
}

export interface Image {
  type: number
  url: string
}

export type MetadataType = 'cn_remotePlay' | 'cn_numberOfNetworkPlayers' | 'secondary_classification' | 'game_subgenre' | 'game_genre' | 'playable_platform' | 'subgenre' | 'tertiary_classification' | 'container_type' | 'genre' | 'cn_inGamePurchases' | 'primary_classification' | 'cn_onlinePlayMode' | 'cn_vrEnabled' | 'cn_playstationMove' | 'cn_wirelessController' | 'cn_vrRequired' | 'cn_psEnhanced' | 'cn_numberOfPlayers' | 'cn_dualshockVibration' | 'cn_psVrAimRequired' | 'cn_singstarMicrophone' | 'cn_playstationCamera' | 'cn_psVrAimEnabled'

export interface MetadataItem {
  name: string
  values: string[]
}

export type Metadata = Record<MetadataType, MetadataItem>

export interface Position {
  start: number
  end: number
}

export interface Link {
  activeLocales: string[]
  bucket: string
  container_type: string
  content_type: number | string
  gameContentTypesList: GameContentTypeList[]
  game_contentType: string
  id: string
  images: Image[]
  is_child: boolean
  is_suggested: boolean
  metadata: Metadata
  name: string
  playable_platform: string[]
  positions: Position[]
  provider_name: string
  release_date: string
  restricted: boolean
  revision: number
  short_name: string
  timestamp: number
  top_category: string
  url: string
}

export interface ExtendedLink extends Link {
  parts: string[]
}

export interface Results {
  age_limit: number
  attributes: Attributes
  content_origin: number
  dob_required: boolean
  images: unknown[]
  links: Link[]
  metadata: unknown
  promomedia: unknown[]
  restricted: boolean
  revision: number
  searchExperimentId: string
  size: number
  sku_links: unknown[]
  start: number
  total_results: number
  total_suggested: number
}
