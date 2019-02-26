import { h, Component, cloneElement } from 'preact'
type State = {
    isVisible: boolean
}

type Props = {
    children: any
}

class Observer extends Component<Props, State> {
    io: any
    container: HTMLElement
    componentDidMount() {
        this.io = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
            this.setState({ isVisible: entry.isIntersecting })
        })
        this.io.observe(this.container)
    }
    componentWillUnmount() {
        if (this.io) {
            this.io.disconnect()
        }
    }
    render({ children }: Props, { isVisible }: State) {
        return (
            <div ref={div => (this.container = div)}>
                {children.map((child: any) => (child ? cloneElement(child, { isVisible }) : null))}
            </div>
        )
    }
}

export default Observer