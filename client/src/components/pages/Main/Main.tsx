import React from 'react'
import Banner from '../../Banner/Banner'
import Page from '../../Page/Page'
import { NavigationItem } from '../../../assets/models/navigation'

interface MainProps {
  navigation: NavigationItem[]
}

const Main: React.FC<MainProps> = ({ navigation }) => (
  <Page>
    {navigation.map((panel) => (
      <Banner
        key={panel.id}
        image={panel.image}
        title={panel.title}
        subtitle={panel.subTitle}
        params={panel.params}
      />
    ))}
  </Page>
)

export default Main
