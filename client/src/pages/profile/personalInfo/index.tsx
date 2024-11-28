import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import PersonalInfo from '../../../components/pages/PersonalInfo/PersonalInfo'
import { checkAuthorization } from '../../../helpers/functions/checkAuthorization'

export const getServerSideProps: GetServerSideProps = async (context) => {
  checkAuthorization(context)

  return {
    props: {},
  }
}

const PersonalInfoPage = () => (
  <>
    <Head>
      <title>Персональная информация</title>
    </Head>
    <PersonalInfo />
  </>
)

export default PersonalInfoPage
