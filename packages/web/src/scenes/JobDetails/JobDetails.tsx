import { PageHeader, Typography } from 'antd'
import React from 'react'

const { Paragraph } = Typography

export default ({ footer }) => (
  <PageHeader title='Web designer' footer={footer}>
    <div>
      <img
        width={140}
        src='https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Intel_old_logo.svg/1280px-Intel_old_logo.svg.png'
        alt='logo'
      />
    </div>
    <div>
      <Paragraph>
        Ant Design interprets the color system into two levels: a system-level
        color system and a product-level color system.
      </Paragraph>
      <Paragraph>
        Ant Design&#x27;s design team preferred to design with the HSB color
        model, which makes it easier for designers to have a clear psychological
        expectation of color when adjusting colors, as well as facilitate
        communication in teams.
      </Paragraph>
      <Paragraph>
        Ant Design&#x27;s design team preferred to design with the HSB color
        model, which makes it easier for designers to have a clear psychological
        expectation of color when adjusting colors, as well as facilitate
        communication in teams.
      </Paragraph>
    </div>
  </PageHeader>
)
