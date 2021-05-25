class MyOutsideComponent extends React.Component {
    render() {
        return (
            <FirstContext.Consumer >
                { first =>
                    (< SecondContext.Consumer >
                        { second =>
                            ( < ThirdContext.Consumer >
                                {  third =>
                                    ( < FourthContext.Consumer >
                                        { fourth =>
                                            ( < MyComponent first = {first} second={second} third={third} fourth={fourth} />)
                                        }
                                    </FourthContext.Consumer>)
                                }
                            </ThirdContext.Consumer>)
                        }
                    </SecondContext.Consumer>)
                }
            </FirstContext.Consumer>
        );
    }
}