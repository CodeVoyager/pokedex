import React, { ErrorInfo } from 'react';

export type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(e: Error) {
  //   return { hasError: true };
  // }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. :(</h1>;
    }

    return this.props.children;
  }
}
