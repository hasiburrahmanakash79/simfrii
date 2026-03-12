import { Link } from "react-router-dom";
import useStaffOverview from "../../../components/staffHook/useStaffOverview";

const TicketList = () => {
  const { overview, loading } = useStaffOverview();
  const ticketList = overview?.tickets?.results || [];

  const formatDate = (dateStr) => {
    if (!dateStr?.trim()) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "N/A";
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = (hours % 12 || 12).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${hour12}:${minutes} ${ampm}, ${day} ${month} ${year}`;
  };

  // Sort by latest first and take only last 7 tickets
  const recentTickets = [...ticketList]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 7);

  if (loading) {
    return <div className="text-center py-10">Loading tickets...</div>;
  }

  return (
    <div className="mt-5">
      {/* Main Card Container with Perfect Rounded Corners */}
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        {/* Header */}
        <h1 className="text-2xl font-semibold p-5 bg-white border-b border-gray-200">
          Recent Tickets
        </h1>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {recentTickets.map((ticket) => (
                  <tr key={ticket.ticket_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/dashboard/ticketDetail/${ticket.ticket_id}`} // Fixed route if needed
                        className="text-sm text-gray-900 hover:text-blue-600 font-medium"
                      >
                        {ticket.ticket_id?.trim() || "N/A"}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.user_email?.trim() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.order_id?.trim() || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(ticket.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full capitalize ${
                          ticket.status === "solved"
                            ? "bg-green-100 text-green-600"
                            : ticket.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ticket.status?.trim() || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentTickets.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden p-4 space-y-4">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.ticket_id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      to={`/dashboard/ticketDetail/${ticket.ticket_id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      Ticket: {ticket.ticket_id?.trim() || "N/A"}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {ticket.user_email?.trim() || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{ticket.order_id?.trim() || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Date:</span>
                    <span className="font-medium">{formatDate(ticket.created_at)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        ticket.status === "active"
                          ? "bg-green-100 text-green-800"
                          : ticket.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {ticket.status?.trim() || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {recentTickets.length === 0 && (
              <div className="text-center text-gray-500 py-8">No tickets found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;