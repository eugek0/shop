import React from 'react'
import Tabs from '../../../UI/Tabs/Tabs'
import SupportBlock from '../../../SupportBlock/SupportBlock'

import styles from './productAdditionalInfo.module.scss'
import { ProductDetailedItem } from '../../../../assets/models/catalog'
import DescriptionTable from './DescriptionTable/DescriptionTable'
import Svg from '../../../UI/Svg/Svg'

interface ProductAdditionalInfoProps {
  product: ProductDetailedItem
}

const Description: React.FC<ProductAdditionalInfoProps> = ({ product }) => {
  const { title, id, description, type, gender } = product

  const tableData = [
    {
      title: 'тип аромата',
      description: type.title,
    },
    {
      title: 'для кого',
      description: gender.title,
    },
    {
      title: 'группа ароматов',
      description: type.sentiment,
    },
    {
      title: 'верхние ноты',
      description: type.topNotes,
    },
    {
      title: 'средние ноты',
      description: type.middleNotes,
    },
    {
      title: 'нижние ноты',
      description: type.lowNotes,
    },
  ]

  return (
    <div className={styles.Description}>
      <div className={styles.TitleContainer}>
        <span>{title}</span>
        <span className={styles.Code}>код товара: {id}</span>
      </div>
      <span>{description}</span>
      <div className={styles.AdditionalDescription}>
        <span>подробные характеристики</span>
        <DescriptionTable array={tableData} />
      </div>
      <div className={styles.AdditionalDescription}>
        <span>поделиться:</span>
        <div className={styles.SocialContainer}>
          <div className={styles.Social}>
            <Svg className={styles.SocialSvg} name='vk-logo' />
          </div>
          <div className={styles.Social}>
            <Svg className={styles.SocialSvg} name='telegram-logo' />
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductAdditionalInfo: React.FC<ProductAdditionalInfoProps> = ({
  product,
}) => {
  const tabs = [
    {
      title: 'описание',
      content: <Description product={product} />,
    },
    // :todo Доработать разделы
    // {
    //   title: 'состав',
    //   content: <span>456</span>,
    // },
    // {
    //   title: 'дополнительная информация',
    //   content: <span>789</span>,
    // },
  ]

  return (
    <div className={styles.ProductAdditionalInfo}>
      <SupportBlock />
      <Tabs className={styles.ProductTabs} tabs={tabs} />
    </div>
  )
}

export default ProductAdditionalInfo
