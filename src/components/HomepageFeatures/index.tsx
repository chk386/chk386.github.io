import clsx from 'clsx';
import Heading from '@theme/Heading';
import mo from '@site/static/img/undraw_docusaurus_mountain.svg';
import mo1 from '@site/static/img/undraw_docusaurus_tree.svg';
import mo2 from '@site/static/img/undraw_docusaurus_react.svg';
import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '캠핑 스토리',
    Svg: mo,
    description: (
      <>
        <h2>{'캠핑 스토리'}</h2>
        <h3>{'인생 즐겁게..'}</h3>
      </>
    ),
  },
  {
    title: '아윤이',
    Svg: mo1,
    description: (
      <>
        {'Docusaurus lets you focus on your docs, and we'}&apos;
        {'ll do the chores. Go ahead and move your docs into the'} <code>{'docs'}</code> {'directory.'}
      </>
    ),
  },
  {
    title: '업무 관련',
    Svg: mo2,
    description: (
      <>
        {'Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same'}
        {'header and footer.'}
      </>
    ),
  },
  {
    title: '업무 관련 받고 하나더 ',
    Svg: mo2,
    description: (
      <>
        {'Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same'}
        {'header and footer.'}
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={'text--center'}>
        <Svg className={styles.featureSvg} role={'img'} />
      </div>
      <div className={'text--center padding-horiz--md'}>
        <Heading as={'h3'}>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={'container'}>
        <div className={'row'}>
          {FeatureList.map(props => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
