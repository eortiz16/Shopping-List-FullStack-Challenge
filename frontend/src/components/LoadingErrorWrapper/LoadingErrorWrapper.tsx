import React from 'react';

import ErrorComponent from '../../shared/ErrorComponent/ErrorComponent';
import Loading from '../../shared/LoadingComponent/LoadingComponent';
import { LoadingErrorWrapperProps } from '../../types/LoadingErrorWrapperProps';

/**
 * LoadingErrorWrapper component to handle loading and error states.
 *
 * This component renders a loading indicator if the `loading` prop is true,
 * an error message if the `error` prop is not null, or the children components
 * if neither `loading` nor `error` is present.
 *
 * @param {LoadingErrorWrapperProps} props - The props object.
 * @param {boolean} props.loading - Indicates whether the loading state is active.
 * @param {string | null} [props.error] - The error message to display, if any.
 * @param {React.ReactNode} props.children - The children components to render.
 * @returns {JSX.Element} The rendered component.
 */
const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) return <Loading />;
  if (error) return <ErrorComponent errorMessage={error} />;
  return <>{children}</>;
};

export default LoadingErrorWrapper;
