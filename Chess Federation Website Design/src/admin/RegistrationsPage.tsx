import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Trash2, Search, Filter, Clock, Mail, Phone } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function RegistrationsPage() {
  const { registrations, approveRegistration, rejectRegistration, deleteRegistration } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTournament, setFilterTournament] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Get unique tournament titles
  const tournaments = Array.from(new Set(registrations.map(r => r.tournamentTitle)));

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);
    
    const matchesTournament = filterTournament === 'all' || reg.tournamentTitle === filterTournament;
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    
    return matchesSearch && matchesTournament && matchesStatus;
  });

  const handleApprove = (id: string) => {
    approveRegistration(id);
    toast.success('Registration approved successfully');
  };

  const handleReject = (id: string) => {
    rejectRegistration(id);
    toast.success('Registration rejected');
  };

  const handleDelete = (id: string) => {
    deleteRegistration(id);
    toast.success('Registration deleted');
    setDeletingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'blitz': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'rapid': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'classical': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const approvedCount = registrations.filter(r => r.status === 'approved').length;
  const rejectedCount = registrations.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Quick Guide */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-royal rounded-lg p-5 border border-green-500/30 royal-glow"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-2">Tournament Registration Management</h3>
            <p className="text-gray-300 text-sm mb-3">
              Review player registrations and take action. View all registrations in the table below.
            </p>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Click <strong>Approve</strong> to accept players</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="w-4 h-4" />
                <span>Click <strong>Reject</strong> to decline players</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Trash2 className="w-4 h-4" />
                <span>Click <strong>Delete</strong> to remove permanently</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <div>
        <h2 className="text-2xl text-white mb-2">Tournament Registrations</h2>
        <p className="text-gray-400">Review and manage player registrations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-royal border-amber-500/30 royal-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pending Review</p>
                <h3 className="text-3xl text-white">{pendingCount}</h3>
              </div>
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-royal border-green-500/30 royal-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Approved</p>
                <h3 className="text-3xl text-white">{approvedCount}</h3>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-royal border-red-500/30 royal-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Rejected</p>
                <h3 className="text-3xl text-white">{rejectedCount}</h3>
              </div>
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-royal border-purple-500/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="pl-10 bg-white/5 border-purple-500/30 text-white"
              />
            </div>
            <Select value={filterTournament} onValueChange={setFilterTournament}>
              <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                <SelectValue placeholder="Filter by tournament" />
              </SelectTrigger>
              <SelectContent className="glass-royal border-purple-500/30">
                <SelectItem value="all">All Tournaments</SelectItem>
                {tournaments.map((tournament) => (
                  <SelectItem key={tournament} value={tournament}>
                    {tournament}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="glass-royal border-purple-500/30">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="glass-purple border border-purple-500/30">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
            All ({registrations.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-amber-600">
            Pending ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-green-600">
            Approved ({approvedCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <RegistrationsTable
            registrations={filteredRegistrations}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={setDeletingId}
            getStatusColor={getStatusColor}
            getCategoryColor={getCategoryColor}
          />
        </TabsContent>

        <TabsContent value="pending">
          <RegistrationsTable
            registrations={filteredRegistrations.filter(r => r.status === 'pending')}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={setDeletingId}
            getStatusColor={getStatusColor}
            getCategoryColor={getCategoryColor}
          />
        </TabsContent>

        <TabsContent value="approved">
          <RegistrationsTable
            registrations={filteredRegistrations.filter(r => r.status === 'approved')}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={setDeletingId}
            getStatusColor={getStatusColor}
            getCategoryColor={getCategoryColor}
          />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="glass-royal border-purple-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Registration?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete this registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass-purple border-purple-500/30 text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface RegistrationsTableProps {
  registrations: any[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  getStatusColor: (status: string) => string;
  getCategoryColor: (category: string) => string;
}

function RegistrationsTable({
  registrations,
  onApprove,
  onReject,
  onDelete,
  getStatusColor,
  getCategoryColor,
}: RegistrationsTableProps) {
  return (
    <Card className="glass-royal border-purple-500/30 royal-glow overflow-hidden">
      <CardContent className="p-0">
        {registrations.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white mb-2">No Registrations Found</h3>
            <p className="text-gray-400">
              {filteredRegistrations.length === 0 && registrations.length > 0
                ? 'Try adjusting your filters or search terms'
                : 'No players have registered yet. Registrations will appear here when players sign up from the website.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-500/30 hover:bg-purple-500/5">
                  <TableHead className="text-gray-300">Player Name</TableHead>
                  <TableHead className="text-gray-300">Contact</TableHead>
                  <TableHead className="text-gray-300">Tournament</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Rating</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg, index) => (
                  <motion.tr
                    key={reg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-purple-500/20 hover:bg-purple-500/10 gel-transition"
                  >
                    <TableCell className="text-white">{reg.playerName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Mail className="w-3 h-3" />
                          <span>{reg.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{reg.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400 max-w-xs truncate">
                      {reg.tournamentTitle}
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(reg.category)}>
                        {reg.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-purple-400">
                      {reg.rating || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(reg.status)}>
                        {reg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {reg.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => onApprove(reg.id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onReject(reg.id)}
                              className="glass-purple border-red-500/30 text-red-400 hover:text-red-300"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDelete(reg.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
