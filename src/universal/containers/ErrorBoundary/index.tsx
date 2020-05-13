import React, { ErrorInfo } from 'react';

export type State = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

export class ErrorBoundary extends React.Component<unknown, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });

    // console.log('----------------');
    // console.error(error, errorInfo);
    // console.log('----------------');
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. :(</h1>;
    }

    return this.props.children;
  }
}
