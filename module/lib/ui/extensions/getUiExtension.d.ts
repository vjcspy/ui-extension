import { UiComponent } from '../../types';
/**
 * Phải trả về luôn component function cái mà đã được config.
 * Nếu wrap lại thì các nextPage sẽ không work do không expose ra `getInitialProps`
 *
 * @param uiId
 * @returns {React.NamedExoticComponent<object>}
 */
export declare const getUiExtension: (uiId: string) => UiComponent<any>;
