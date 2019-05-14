import { Checkbox, Button } from 'antd'
import React from 'react'

import alertaEmpregoImgSrc from '../../assets/alertaEmprego.png'
import bepImgSrc from '../../assets/bep.jpg'
import cargaTrabalhosImgSrc from '../../assets/cargaTrabalhos.jpg'
import expessoEmpregoImgSrc from '../../assets/expessoEmprego.png'
import sapoImgSrc from '../../assets/sapo.png'
import turiJobsImgSrc from '../../assets/turiJobs.jpg'
import styles from './styles.module.css'

export default () => (
  <div className={styles.index}>
    <h2>
      Choose job boards{' '}
      <Button htmlType='button' ghost={true} type='primary'>
        Select All
      </Button>
    </h2>
    <div className={styles.channelsList}>
      <div className={styles.channel}>
        <h3>Net-empregos</h3>
        <Checkbox value='netEmpregos'>
          <img
            alt='logo'
            src='http://www.net-empregos.com/images/logo_net3.png'
          />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Sapo Emprego</h3>
        <Checkbox value='sapoEmprego'>
          <img alt='logo' src={sapoImgSrc} />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Alerta Emprego</h3>
        <Checkbox value='alertaEmprego'>
          <img alt='logo' src={alertaEmpregoImgSrc} />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Expresso Emprego</h3>
        <Checkbox value='expressoEmprego'>
          <img alt='logo' src={expessoEmpregoImgSrc} />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Carga de Trabalhos</h3>
        <Checkbox value='cargaTrabalhos'>
          <img alt='logo' src={cargaTrabalhosImgSrc} />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>BEP</h3>
        <Checkbox value='bep'>
          <img alt='logo' src={bepImgSrc} />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Jobtide</h3>
        <Checkbox value='bep'>
          <img
            alt='logo'
            src={
              'https://d13sauvqul3gw9.cloudfront.net/4cae19777831e0a6dcda0a42f9298ac841967ebb.png'
            }
          />
        </Checkbox>
      </div>

      <div className={styles.channel}>
        <h3>CareerJet</h3>
        <Checkbox value='bep'>
          <img
            alt='logo'
            src={'https://ssl-static.careerjet.net/images/logo_ws_home_pt.png'}
          />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Emprego XL</h3>
        <Checkbox value='bep'>
          <img
            alt='logo'
            src={
              'https://scontent.flis9-1.fna.fbcdn.net/v/t1.0-9/293846_432663350129555_686007929_n.jpg?_nc_cat=106&_nc_ht=scontent.flis9-1.fna&oh=02e488c8018c58ea7f1ba9ce39ee54c4&oe=5D5CC026'
            }
          />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>IT Jobs</h3>
        <Checkbox value='bep'>
          <img alt='logo' src={'https://static.itjobs.pt/images/logo.png'} />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Emprego Saúde</h3>
        <Checkbox value='bep'>
          <img
            alt='logo'
            src={
              'http://www.empregosaude.pt/wp-content/themes/jobright/images/logo.jpg'
            }
          />
        </Checkbox>
      </div>
      <div className={styles.channel}>
        <h3>Turijobs</h3>
        <Checkbox value='bep'>
          <img alt='logo' src={turiJobsImgSrc} />
        </Checkbox>
      </div>
    </div>
  </div>
)
