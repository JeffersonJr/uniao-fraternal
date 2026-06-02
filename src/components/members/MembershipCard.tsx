import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Member } from "@/lib/members-db";
import logoUrl from "@/assets/logo.svg";

interface MembershipCardProps {
  member: Member;
}

export function MembershipCard({ member }: MembershipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const valUrl = `${window.location.origin}/membros/carteirinha/validar?id=${member.id}`;
      QRCode.toDataURL(
        valUrl,
        {
          margin: 1,
          width: 250,
          color: {
            dark: "#0b1528", // deep navy
            light: "#ffffff",
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrUrl(url);
          }
        }
      );
    }
  }, [member.id]);

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Card Container */}
      <div
        className="w-full max-w-[380px] h-[580px] perspective-1000 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        {/* Card Flipper wrapper */}
        <div
          className={`relative w-full h-full duration-700 preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT OF THE CARD */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-b from-[#0A1128] via-[#101b3a] to-[#0A1128] border-2 border-gold shadow-elegant backface-hidden flex flex-col justify-between overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
              <img src={logoUrl} alt="Watermark" className="w-[120%] h-[120%] object-contain" />
            </div>

            {/* Top Bar / Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-gold/30 pb-3">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Brasão" className="h-10 w-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-gold/80 leading-none">A.R.L.S.</h3>
                  <h2 className="font-display text-sm font-semibold text-primary-foreground leading-tight">União Fraternal</h2>
                  <p className="text-[8px] uppercase tracking-[0.1em] text-gold/60">Nº 1 · Or. Praia Grande</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#D4AF37]/15 text-gold border border-gold/35 tracking-wider uppercase">
                  Membro Ativo
                </span>
                <span className="text-[8px] text-muted-foreground mt-1">CIM: {member.cim}</span>
              </div>
            </div>

            {/* Profile Section */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="relative mb-5">
                {/* Photo border decorative frames */}
                <div className="absolute inset-0 rounded-2xl border border-gold/50 rotate-3 scale-105 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl border border-gold/50 -rotate-3 scale-105 pointer-events-none" />
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gold relative z-10 shadow-gold bg-black/20 flex items-center justify-center">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // fallback
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="text-gold font-display text-4xl">G</div>
                  )}
                </div>
              </div>

              {/* Name & Role */}
              <h2 className="font-display text-2xl text-center text-primary-foreground leading-snug font-medium mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {member.name}
              </h2>
              <p className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-6">
                {member.role}
              </p>

              {/* Card Details grid */}
              <div className="w-full grid grid-cols-2 gap-4 border-t border-b border-gold/20 py-4 px-2 bg-black/10 rounded-xl">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground mb-0.5">Iniciação</p>
                  <p className="text-xs text-primary-foreground font-medium">{member.initiationDate}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground mb-0.5">CIM Número</p>
                  <p className="text-xs text-primary-foreground font-medium">{member.cim}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground mb-0.5">E-mail</p>
                  <p className="text-xs text-primary-foreground font-medium truncate">{member.email}</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar / Footer */}
            <div className="relative z-10 flex justify-between items-end border-t border-gold/30 pt-3 text-muted-foreground text-[8px]">
              <div>
                <p className="uppercase tracking-[0.1em] text-gold/60">G.·. A.·. D.·. U.·.</p>
                <p className="mt-0.5">Fundação: 09/03/2024</p>
              </div>
              <p className="text-right text-[7px] uppercase tracking-[0.05em] text-gold/40">
                Toque para girar e ver QR Code
              </p>
            </div>
          </div>

          {/* BACK OF THE CARD */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-b from-[#0A1128] via-[#101b3a] to-[#0A1128] border-2 border-gold shadow-elegant backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
              <img src={logoUrl} alt="Watermark" className="w-[120%] h-[120%] object-contain" />
            </div>

            {/* Top Bar / Header */}
            <div className="relative z-10 flex items-center gap-3 border-b border-gold/30 pb-3">
              <img src={logoUrl} alt="Brasão" className="h-10 w-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              <div>
                <h2 className="font-display text-sm font-semibold text-primary-foreground leading-tight">União Fraternal Nº 1</h2>
                <p className="text-[8px] uppercase tracking-[0.1em] text-gold/60">Membro Regular Autenticado</p>
              </div>
            </div>

            {/* QR Code Validation Section */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="p-3 bg-white rounded-2xl shadow-gold border border-gold/45 mb-4 max-w-[200px]">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR Code de Validação" className="w-full h-auto" />
                ) : (
                  <div className="w-44 h-44 bg-gray-100 animate-pulse rounded-xl" />
                )}
              </div>
              <p className="text-gold uppercase tracking-[0.2em] text-[9px] font-bold mb-1">
                VALIDAÇÃO ELETRÔNICA
              </p>
              <p className="text-muted-foreground text-[8px] text-center max-w-[250px] leading-normal">
                Aponte a câmera do celular para ler o código QR acima e verificar a autenticidade e a situação cadastral deste membro.
              </p>
            </div>

            {/* Signature Block */}
            <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-gold/30 pt-4 mb-2 text-center">
              <div className="flex flex-col items-center">
                <span className="font-serif italic text-gold/80 text-xs font-semibold leading-none mb-1 select-none">
                  Venerável Mestre
                </span>
                <span className="w-24 h-0.5 bg-gold/30 mb-1" />
                <span className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground">Venerável Mestre</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-serif italic text-gold/80 text-xs font-semibold leading-none mb-1 select-none">
                  Secretário
                </span>
                <span className="w-24 h-0.5 bg-gold/30 mb-1" />
                <span className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground">Secretário da Loja</span>
              </div>
            </div>

            {/* Bottom Bar / Footer */}
            <div className="relative z-10 flex justify-between items-end text-[7px] text-gold/50">
              <p>Or.·. de Praia Grande — SP</p>
              <p className="text-right text-[7px] uppercase tracking-[0.05em] text-gold/40">
                Clique para voltar à frente
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-xs mt-4 italic">
        Clique na carteirinha para ver o {flipped ? "verso" : "verso com QR Code"}
      </p>
    </div>
  );
}
