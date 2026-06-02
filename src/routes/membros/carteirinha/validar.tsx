import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Member, getMemberById, getMembers } from "@/lib/members-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, ShieldAlert, ArrowLeft, Calendar, FileText, User, Mail, Search, CheckCircle, Camera, X } from "lucide-react";
import logoUrl from "@/assets/logo.svg";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";

const searchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/membros/carteirinha/validar")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Validador de Carteirinha — A.R.L.S. União Fraternal Nº 1" },
      { name: "description", content: "Validador oficial de identificação maçônica. Verifique a autenticidade de membros." },
    ],
  }),
  component: ValidateCardPage,
});

function ValidateCardPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validationTime, setValidationTime] = useState("");

  // QR Code Scanner state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerError, setScannerError] = useState("");

  const handleScannedText = (text: string) => {
    try {
      if (text.startsWith("http://") || text.startsWith("https://")) {
        const url = new URL(text);
        const idParam = url.searchParams.get("id");
        if (idParam) {
          navigate({ to: "/membros/carteirinha/validar", search: { id: idParam } });
        } else {
          setSearchId(text);
          setMember(null);
          setSearched(true);
        }
      } else {
        setSearchId(text);
        let found: Member | null = getMemberById(text) || null;
        if (!found) {
          const all = getMembers();
          found = all.find((m) => m.cim === text) || null;
        }
        setMember(found);
        setSearched(true);
      }
    } catch (err) {
      setSearchId(text);
      let found: Member | null = getMemberById(text) || null;
      if (!found) {
        const all = getMembers();
        found = all.find((m) => m.cim === text) || null;
      }
      setMember(found);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (!isScannerOpen) return;

    let isCancelled = false;
    let html5QrCode: Html5Qrcode | null = null;
    
    const startScanner = async () => {
      try {
        if (isCancelled) return;
        html5QrCode = new Html5Qrcode("reader");
        
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: (width, height) => {
              const size = Math.min(width, height) * 0.7;
              return { width: size, height: size };
            }
          },
          (decodedText) => {
            if (html5QrCode) {
              html5QrCode.stop().then(() => {
                setIsScannerOpen(false);
                handleScannedText(decodedText);
                toast.success("Código QR lido com sucesso!");
              }).catch(console.error);
            }
          },
          () => {} // Quiet error
        );

        if (isCancelled && html5QrCode.isScanning) {
          html5QrCode.stop().catch(console.error);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error(err);
          setScannerError("Permissão de câmera negada ou dispositivo sem câmera disponível.");
        }
      }
    };

    const timer = setTimeout(() => {
      startScanner();
    }, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [isScannerOpen]);

  useEffect(() => {
    if (search.id) {
      const found = getMemberById(search.id);
      setMember(found || null);
      setSearched(true);
      setSearchId(search.id);
    } else {
      setMember(null);
      setSearched(false);
    }
    setLoading(false);
    setValidationTime(
      new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        dateStyle: "long",
        timeStyle: "medium",
      })
    );
  }, [search.id]);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    // Search first by ID
    let found: Member | null = getMemberById(searchId.trim()) || null;
    
    // If not found, try searching by CIM number
    if (!found) {
      const all = getMembers();
      found = all.find((m) => m.cim === searchId.trim()) || null;
    }

    setMember(found);
    setSearched(true);
    setLoading(false);
    setValidationTime(
      new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        dateStyle: "long",
        timeStyle: "medium",
      })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Back button */}
          <Link
            to="/membros"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
          </Link>

          {/* Title */}
          <div className="mb-10 text-center animate-fade-up">
            <ShieldCheck className="w-12 h-12 text-gold mx-auto mb-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-2">Segurança e Autenticação</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-primary">
              Validador de Credenciais
            </h1>
            <div className="gold-divider w-24 mx-auto mt-4" />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 rounded-full border-4 border-gold border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Validando credencial...</p>
            </div>
          ) : searched ? (
            /* VALIDATION RESULT */
            <div className="space-y-6 animate-fade-up">
              {member ? (
                /* VALID CARD */
                <div className="bg-card border-2 border-emerald-500 rounded-3xl p-8 shadow-elegant text-center relative overflow-hidden">
                  {/* Decorative green accent */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500" />
                  
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 tracking-wider uppercase inline-block mb-3">
                    Credencial Válida
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl text-primary font-bold mb-2">
                    Identidade Autenticada
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                    Confirmamos que o membro abaixo é regular e está devidamente registrado nos arquivos da A.R.L.S. União Fraternal Nº 1.
                  </p>

                  {/* Member Badge info */}
                  <div className="bg-muted border border-border rounded-2xl p-6 text-left flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gold flex-shrink-0 bg-black/5 flex items-center justify-center">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-gold text-3xl">G</span>
                      )}
                    </div>
                    <div className="min-w-0 text-center md:text-left flex-grow">
                      <h3 className="font-display text-xl text-primary font-bold truncate">
                        {member.name}
                      </h3>
                      <p className="text-gold uppercase tracking-wider text-xs font-semibold mt-0.5">
                        {member.role}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-4 border-t border-border/70 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-gold/80" />
                          <span>CIM: <strong className="text-foreground">{member.cim}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gold/80" />
                          <span>Início: <strong className="text-foreground">{member.initiationDate}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp & Authority details */}
                  <div className="text-[10px] text-muted-foreground text-center border-t border-border pt-6 space-y-1">
                    <p>Consultado em: <strong>{validationTime}</strong></p>
                    <p className="uppercase tracking-wider text-gold/60 mt-2 font-bold">
                      A.R.L.S. União Fraternal Nº 1
                    </p>
                    <p>Oriente de Praia Grande · SP · Brasil</p>
                    <p className="text-[9px] text-gold/65 font-medium mt-1">Filiada ao Grande Oriente Maçônico do Brasil (GOMB)</p>
                  </div>
                </div>
              ) : (
                /* INVALID / NOT FOUND CARD */
                <div className="bg-card border-2 border-destructive/80 rounded-3xl p-8 shadow-elegant text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-2 bg-destructive/85" />
                  
                  <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5 border border-destructive/30">
                    <ShieldAlert className="w-10 h-10 text-destructive" />
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-destructive/10 text-destructive border border-destructive/20 tracking-wider uppercase inline-block mb-3">
                    Aviso de Segurança
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl text-primary font-bold mb-2">
                    Registro não Encontrado
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                    A credencial com o ID ou CIM informado <strong className="text-destructive">"{searchId}"</strong> não foi localizada em nossos cadastros ou está inativa.
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-normal max-w-sm mx-auto mb-8 bg-destructive/5 p-4 rounded-xl border border-destructive/10">
                    Atenção: Apenas membros em situação cadastral regular possuem credenciais válidas. Se você acredita que isso é um erro, contate a Secretaria da Loja.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => {
                        setScannerError("");
                        setIsScannerOpen(true);
                      }}
                      variant="outline"
                      className="border-gold/30 hover:bg-gold/5 text-primary h-10 px-5 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-gold" />
                      Escanear QR Code
                    </Button>
                    <Button
                      onClick={() => {
                        setSearched(false);
                        setSearchId("");
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 text-xs font-semibold cursor-pointer"
                    >
                      Digitar CIM / ID
                    </Button>
                    <Button asChild variant="outline" className="border-border hover:bg-secondary h-10 px-6 text-xs font-semibold">
                      <Link to="/membros">Ver Lista de Membros</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* LOOKUP FORM */
            <div
              className="bg-card border border-border rounded-2xl p-8 shadow-elegant animate-fade-up font-sans"
              style={{ animationDelay: "0.1s" }}
            >
              <form onSubmit={handleManualSearch} className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Insira o ID de validação ou o número CIM do membro abaixo para consultar as informações oficiais e a situação cadastral em tempo real.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="searchId" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-gold" /> Identificador / CIM do Membro
                  </Label>
                  <Input
                    type="text"
                    id="searchId"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Ex: jefferson-campos-beira-junior ou 32071"
                    required
                    className="h-12 bg-background border-border hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setScannerError("");
                      setIsScannerOpen(true);
                    }}
                    variant="outline"
                    className="border-gold/30 hover:bg-gold/5 text-primary h-11 px-5 text-sm font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-gold" />
                    Escanear QR Code (Câmera)
                  </Button>
                  <Button type="submit" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold font-medium h-11 px-8 cursor-pointer">
                    Consultar Credencial
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Scanner Overlay Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in print:hidden">
          <div className="bg-[#0A1128] border border-gold/35 rounded-3xl max-w-md w-full p-6 shadow-2xl relative flex flex-col items-center">
            
            {/* Close Button */}
            <button
              onClick={() => setIsScannerOpen(false)}
              className="absolute top-4 right-4 p-2 text-primary-foreground/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <Camera className="w-10 h-10 text-gold mx-auto mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              <h3 className="font-display text-lg font-bold text-primary-foreground">
                Escanear Carteirinha
              </h3>
              <p className="text-xs text-primary-foreground/60 mt-1 max-w-[280px]">
                Aponte a câmera do celular para o código QR localizado no verso da carteirinha do membro.
              </p>
            </div>

            {/* Camera Viewport Container */}
            <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden border border-gold/25 bg-black flex items-center justify-center">
              {scannerError ? (
                <div className="p-4 text-center text-xs text-destructive flex flex-col items-center gap-2">
                  <ShieldAlert className="w-8 h-8 text-destructive" />
                  <p>{scannerError}</p>
                </div>
              ) : (
                <>
                  {/* html5-qrcode target */}
                  <div id="reader" className="w-full h-full object-cover [&_video]:object-cover" />
                  
                  {/* Viewfinder Target Border Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
                    <div className="w-full h-full border-[3px] border-dashed border-gold/50 rounded-xl relative">
                      {/* Viewfinder Corners */}
                      <div className="absolute -top-[3px] -left-[3px] w-6 h-6 border-t-[3px] border-l-[3px] border-gold rounded-tl-lg" />
                      <div className="absolute -top-[3px] -right-[3px] w-6 h-6 border-t-[3px] border-r-[3px] border-gold rounded-tr-lg" />
                      <div className="absolute -bottom-[3px] -left-[3px] w-6 h-6 border-b-[3px] border-l-[3px] border-gold rounded-bl-lg" />
                      <div className="absolute -bottom-[3px] -right-[3px] w-6 h-6 border-b-[3px] border-r-[3px] border-gold rounded-br-lg" />
                      
                      {/* Laser pulsing line */}
                      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gold/80 animate-[ping_2s_infinite] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-center w-full">
              <Button
                onClick={() => setIsScannerOpen(false)}
                variant="outline"
                className="border-gold/30 hover:bg-gold/5 text-primary-foreground hover:text-gold h-10 px-6 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
