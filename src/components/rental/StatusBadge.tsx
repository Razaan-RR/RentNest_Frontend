import { Badge } from '@/components/ui/badge'

interface Props {
  status: string
}

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case 'PENDING':
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-500">Pending</Badge>
      )

    case 'APPROVED':
      return <Badge className="bg-blue-500 hover:bg-blue-500">Approved</Badge>

    case 'REJECTED':
      return <Badge className="bg-red-500 hover:bg-red-500">Rejected</Badge>

    case 'ACTIVE':
      return <Badge className="bg-green-500 hover:bg-green-500">Active</Badge>

    case 'COMPLETED':
      return <Badge className="bg-gray-500 hover:bg-gray-500">Completed</Badge>

    default:
      return <Badge>{status}</Badge>
  }
}
