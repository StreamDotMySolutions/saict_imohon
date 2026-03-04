import { Link, useParams } from 'react-router-dom'
import MohonDistributionItemIndex from './components/MohonDistributionItemIndex'

const MohonDistributionItem = () => {
    const { mohonDistributionRequestId } = useParams()

    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/admin/agihan?tab=lulus'>Agihan (Lulus)</Link>
                    </li>
                    <li className='breadcrumb-item active'>Urus Agihan</li>
                </ol>
            </nav>
            <MohonDistributionItemIndex agihanRequestId={mohonDistributionRequestId} />
        </div>
    )
}

export default MohonDistributionItem
