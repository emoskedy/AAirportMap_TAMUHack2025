declare module 'react-native-vector-icons/MaterialIcons' {
    import { IconProps } from 'react-native-vector-icons/Icon';
    export interface MaterialIconProps extends IconProps {}
    const MaterialIcon: React.ComponentType<MaterialIconProps>;
    export default MaterialIcon;
  }