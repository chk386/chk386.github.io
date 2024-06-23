import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type { WrapperProps } from '@docusaurus/types';
import Giscus from '@giscus/react';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  return (
    <>
      <BlogPostItem {...props} />
      <GiscusApp />
    </>
  );
}

function GiscusApp() {
  return (
    <Giscus
      id={'comments'}
      repo={'chk386/chk386.github.io'}
      repoId={'R_kgDOMJx1QQ'}
      category={'General'}
      categoryId={'DIC_kwDOMJx1Qc4CgQx2'}
      mapping={'pathname'}
      term={'Welcome to @giscus/react component!'}
      reactionsEnabled={'1'}
      emitMetadata={'0'}
      inputPosition={'top'}
      theme={'light'}
      lang={'ko'}
      loading={'lazy'}
    />
  );
}
