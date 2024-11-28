export interface NavigationFilterParams {
  isDiscount: boolean
  typeId: string | null
  genderId: string | null
  colorId: string | null
  volumeId: string | null
  motiveId: string | null
}

export interface NavigationItem {
  id: string
  title: string
  params: NavigationFilterParams
  'subTitle': 'коллекция мужской парфюмерии'
  'image': 'forMan.png'
  'buttonText': 'подробнее'
}
