import source from './link.spec.yaml?raw';
import { loadSpec } from '../_lib/loadSpec';

export const linkSpec = loadSpec(source);

/** Shared props for every Link rendered on the guideline page. */
export const linkBaseProps = {
  href: '#',
  children: 'Link',
  onClick: (e: { preventDefault: () => void }) => e.preventDefault(),
};
