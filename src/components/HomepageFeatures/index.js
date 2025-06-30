import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  // {
  //   title: 'Easy to Use',
  //   Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
  //   description: (
  //     <>
  //       Docusaurus was designed from the ground up to be easily installed and
  //       used to get your website up and running quickly.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Focus on What Matters',
  //   Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  //   description: (
  //     <>
  //       Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
  //       ahead and move your docs into the <code>docs</code> directory.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}

          <div className={clsx('col col--12')}>
          <h2>혼자서는 해결할 수 없는 큰 문제를 조직, 팀이라는 지렛대를 이용해 해결하는 과정을 중요하게 생각합니다.</h2>
          
          <ul>
            <li>Java(kotlin)과 Spring을 활용한 엔터프라이즈 레벨의 플랫폼을 설계/개발</li>
            <li>Spring Cloud, Kubernetes, Public Cloud 환경 구성 & 사내 전파</li>
            <li>MySQL, Oracle 등 수억건의 인덱스, 쿼리 설계 & 튜닝, DB 샤딩 개발</li>
            <li>수천대의 온프레미스 서버에서 클라우드 전환</li>
            <li>플랫폼 모니터링 & 옵저버빌리티 확보를 위한 Metrics, Application Log, Distributed Tracing 구성</li>
            <li>대량의 데이터 수집(Kafka, Apache Flink, Apache Iceberg) & 데이터 서빙(FastAPI) & 파이프라인(Airflow) 구축</li>
          </ul>

          <strong>개발 조직 빌딩부터 서비스 런칭까지 여러번의 서비스 라이프 사이클을 경험하였으며, DAU 500만 규모의 커머스 플랫폼과 일 20만 트랜잭션 처리 시스템 구축에 기여하였습니다.</strong>
          </div>

        </div>
      </div>
    </section>
  );
}
